import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CompanyPrefix } from "@/types/supabase";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  leadLinkedInURL: string;
  companyPrefix: CompanyPrefix;
}

const CommentDialog = ({
  isOpen,
  onClose,
  leadLinkedInURL,
  companyPrefix
}: CommentDialogProps) => {
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', companyPrefix, leadLinkedInURL],
    queryFn: async () => {
      const tableName = `${companyPrefix}_Comments`;
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('lead_linkedin_url', leadLinkedInURL)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: isOpen
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const tableName = `${companyPrefix}_Comments`;
    const { error } = await supabase
      .from(tableName)
      .insert([
        {
          lead_linkedin_url: leadLinkedInURL,
          comment: newComment.trim()
        }
      ]);

    if (error) {
      console.error('Error adding comment:', error);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ['comments', companyPrefix, leadLinkedInURL]
    });
    
    setNewComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <div className="mt-4 space-y-2">
          {comments.map((comment: any) => (
            <div key={comment.id} className="border-b py-2">
              <p className="text-[#1A1F2C]">{comment.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;