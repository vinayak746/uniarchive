import { Hand } from "lucide-react";

function App() {
  return (
    <div
      className={`w-full min-h-screen bg-primary text-dark font-montserra-text`}>
      <div className={`flex gap-2`}>
        Hello, there!
        <Hand size={18} />
      </div>
    </div>
  );
}

export default App;
