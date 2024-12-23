import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { CompanyPrefix } from "@/types/supabase";
import { format } from "date-fns";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  leadLinkedInURL: string;
  companyPrefix: CompanyPrefix;
}

const getCommentsTableName = (companyPrefix: CompanyPrefix) => {
  switch (companyPrefix) {
    case "Mitigram":
      return "mitigram_comments";
    case "ToExceed":
      return "toexceed_comments";
    case "Gimi":
      return "gimi_comments";
    default:
      throw new Error("Invalid company prefix");
  }
};

const CommentDialog = ({ isOpen, onClose, leadLinkedInURL, companyPrefix }: CommentDialogProps) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const commentsTableName = getCommentsTableName(companyPrefix);
  
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', leadLinkedInURL, commentsTableName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(commentsTableName)
        .select('*')
        .eq('lead_linkedin_url', leadLinkedInURL)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const { error } = await supabase
      .from(commentsTableName)
      .insert([
        {
          lead_linkedin_url: leadLinkedInURL,
          comment: comment.trim()
        }
      ]);

    if (error) {
      console.error('Error inserting comment:', error);
      return;
    }

    setComment("");
    queryClient.invalidateQueries({ queryKey: ['comments', leadLinkedInURL, commentsTableName] });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={!comment.trim()}>
              Add Comment
            </Button>
          </form>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <p>Loading comments...</p>
            ) : comments.length > 0 ? (
              comments.map((comment: any) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">
                    {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
                  </p>
                  <p className="text-gray-800">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;