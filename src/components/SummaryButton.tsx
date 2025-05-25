
import { useState } from "react";
import { Bot, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Todo } from "./TodoApp";
import { useToast } from "@/hooks/use-toast";

interface SummaryButtonProps {
  todos: Todo[];
}

export const SummaryButton = ({ todos }: SummaryButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (todos.length === 0) {
      toast({
        title: "No pending tasks",
        description: "Add some tasks before generating a summary.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // This will be replaced with actual API calls once backend is set up
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Summary sent to Slack! 🚀",
        description: `Successfully summarized ${todos.length} pending tasks and sent to your Slack channel.`,
      });
    } catch (error) {
      toast({
        title: "Failed to send summary",
        description: "There was an error generating or sending the summary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          AI Summary & Slack Integration
        </h3>
        <p className="text-gray-600 text-sm">
          Generate an AI-powered summary of your pending tasks and send it to your Slack channel
        </p>
      </div>
      
      <Button 
        onClick={handleSummarize}
        disabled={isLoading || todos.length === 0}
        size="lg"
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Generating Summary...
          </>
        ) : (
          <>
            <Bot size={20} className="mr-2" />
            Summarize & Send to Slack
            <Send size={16} className="ml-2" />
          </>
        )}
      </Button>
      
      {todos.length > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          {todos.length} pending task{todos.length !== 1 ? 's' : ''} ready for summary
        </p>
      )}
    </div>
  );
};
