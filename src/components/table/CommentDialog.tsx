import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CompanyPrefix, getCommentsTable } from "@/types/supabase";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  leadLinkedInURL: string;
  companyPrefix: CompanyPrefix;
  comments: any[];
}

const CommentDialog = ({
  isOpen,
  onClose,
  leadLinkedInURL,
  companyPrefix,
  comments
}: CommentDialogProps) => {
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from(getCommentsTable(companyPrefix))
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
          <DialogTitle>Add Comment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
          />
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={onClose} variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <div className="mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b py-2">
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
