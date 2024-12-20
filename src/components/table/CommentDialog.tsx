import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Trash2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { getCommentsTable } from "@/types/supabase";

interface Comment {
  id: string;
  comment: string;
  created_at: string;
}

interface CommentDialogProps {
  linkedinUrl: string;
  hasComments: boolean;
  comments: Comment[];
  onCommentsUpdate: () => void;
  companyPrefix: "Mitigram" | "ToExceed";
}

export const CommentDialog = ({ linkedinUrl, hasComments, comments, onCommentsUpdate, companyPrefix }: CommentDialogProps) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const commentsTable = getCommentsTable(companyPrefix);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      const { error } = await supabase
        .from(commentsTable)
        .insert([
          {
            lead_linkedin_url: linkedinUrl,
            comment: comment.trim(),
          },
        ]);

      if (error) throw error;

      setComment("");
      onCommentsUpdate();
      toast({
        title: "Comment saved",
        description: "Your comment has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving comment:", error);
      toast({
        title: "Error",
        description: "Failed to save comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from(commentsTable)
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      });
      
      onCommentsUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-4 w-4" />
          {hasComments && (
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            Add or view comments for this lead
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-1 flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="h-8 w-8 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-3">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1"
            />
            <Button onClick={handleSubmitComment}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};