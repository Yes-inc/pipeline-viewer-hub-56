import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  linkedinUrl: string;
  companyPrefix: string | null;
}

const CommentDialog = ({ isOpen, onClose, linkedinUrl, companyPrefix }: CommentDialogProps) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const getCommentsTable = (prefix: string) => {
    switch (prefix) {
      case "Mitigram":
        return "Mitigram_Comments";
      case "ToExceed":
        return "ToExceed_Comments";
      case "Gimi":
        return "gimi_comments";
      default:
        throw new Error("Invalid company prefix");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyPrefix) return;

    try {
      const table = getCommentsTable(companyPrefix);
      const { error } = await supabase
        .from(table)
        .insert({
          lead_linkedin_url: linkedinUrl,
          comment: comment.trim()
        });

      if (error) throw error;

      toast.success("Comment added successfully");
      queryClient.invalidateQueries({ queryKey: ["comments", linkedinUrl] });
      setComment("");
      onClose();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment..."
            className="min-h-[100px]"
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!comment.trim()}>
              Add Comment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;