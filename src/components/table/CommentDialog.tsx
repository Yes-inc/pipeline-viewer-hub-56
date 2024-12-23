import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CompanyPrefix } from "@/types/supabase";
import { toast } from "@/components/ui/use-toast";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  leadLinkedInURL: string;
  companyPrefix: CompanyPrefix;
}

const CommentDialog = ({ isOpen, onClose, leadLinkedInURL, companyPrefix }: CommentDialogProps) => {
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', companyPrefix, leadLinkedInURL],
    queryFn: async () => {
      const tableName = `${companyPrefix}_Comments` as const;
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('lead_linkedin_url', leadLinkedInURL)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const tableName = `${companyPrefix}_Comments` as const;
    const { error } = await supabase
      .from(tableName)
      .insert([
        {
          lead_linkedin_url: leadLinkedInURL,
          comment: newComment.trim(),
        },
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setNewComment("");
    queryClient.invalidateQueries({ queryKey: ['comments', companyPrefix, leadLinkedInURL] });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto space-y-4">
          {comments.map((comment: any) => (
            <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{comment.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[100px]"
          />
          <Button type="submit">Add Comment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;