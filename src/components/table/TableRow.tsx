import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PipelineRow } from "../../utils/googleSheets";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Comment {
  id: string;
  comment: string;
  created_at: string;
}

interface PipelineTableRowProps {
  row: PipelineRow;
  index: number;
  isGeneratedLeads?: boolean;
}

export const TableRow = ({
  row,
  index,
  isGeneratedLeads = false,
}: PipelineTableRowProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasComments, setHasComments] = useState(false);
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("lead_linkedin_url", row.LinkedIn_URL)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setComments(data || []);
      setHasComments(data && data.length > 0);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [row.LinkedIn_URL]);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      const { error } = await supabase.from("comments").insert([
        {
          lead_linkedin_url: row.LinkedIn_URL,
          comment: comment.trim(),
        },
      ]);

      if (error) throw error;

      setComment("");
      fetchComments();
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
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      });
      
      fetchComments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <UITableRow key={index}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            {row.Profile_Picture ? (
              <AvatarImage src={row.Profile_Picture} alt={row.Full_Name || ""} />
            ) : (
              <AvatarFallback>
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium">{row.Full_Name}</div>
            <div className="text-sm text-gray-500">{row.Company}</div>
          </div>
        </div>
      </TableCell>
      {isGeneratedLeads && (
        <TableCell className="text-right">{row.Deal_Size}</TableCell>
      )}
      <TableCell className="text-right">
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
      </TableCell>
    </UITableRow>
  );
};