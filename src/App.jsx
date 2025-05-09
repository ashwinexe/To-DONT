import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
      setTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">To-Do (Before It Becomes To-DON'T)</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 text-black rounded"
          placeholder="Enter your task..."
        />
        <button onClick={addTask} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="w-full max-w-md space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded">
            <div
              onClick={() => toggleTask(t.id)}
              className={`flex-1 cursor-pointer ${t.done ? 'line-through text-gray-500' : ''}`}
            >
              {t.text}
            </div>
            <button onClick={() => deleteTask(t.id)} className="text-red-400 hover:text-red-600">✕</button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <div className="mt-6 text-center text-lg text-red-400 font-semibold">
          {(() => {
            const completed = tasks.filter(t => t.done).length;
            const total = tasks.length;
            const incomplete = total - completed;

            if (incomplete === 0) return "Fine. You're not the problem. This app is.";
            if (completed === 0) return "Stunning. You managed to do absolutely nothing.";

            const roasts = [
              "Hope procrastination is part of your personal growth plan.",
              "You left your tasks hanging like your unread emails.",
              "A bold strategy: doing 40% and calling it a day.",
              "Maybe your goals should try completing *you* instead.",
              "Nice! 2/5 done. That’s a pass... if this were kindergarten.",
              "Ah, the art of selective effort. Classic."
            ];
            const index = Math.floor(Math.random() * roasts.length);
            return `You completed ${completed}/${total} tasks. ${roasts[index]}`;
          })()}
        </div>
      )}
    </div>
  );
}

export default App;
