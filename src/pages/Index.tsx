
import { TodoApp } from "@/components/TodoApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo Summary Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Manage your tasks and get AI-powered summaries sent to Slack
          </p>
        </div>
        <TodoApp />
      </div>
    </div>
  );
};

export default Index;
