import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';// Assuming this is where your User type is defined
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store'; // Import your Redux store
import { getTasks, addTask, updateTask, deleteTask } from '../redux/taskSlice'; // Import your task actions
import Pagination from './Pagination';
import { User } from '../redux/authSlice';

type Task = {
  title: string;
  completed: string;
};

function Task() {
  const [session, setSession] = useState<any>(true); // Make sure User type is correctly imported
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [newTask, setNewTask] = useState('');


    useEffect(() => {
    const storedSession = localStorage.getItem('session'); // Or however you store session
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);

  useEffect(() => {
    if (session) {
      dispatch(getTasks({ page: 1 }))
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching tasks:", error);
          setLoading(false);
          toast.error("Error fetching tasks.");
        });
    } else {
      setLoading(false);
    }
  }, [session, dispatch]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !session) return;

    const task: Task = {
      title: newTask,
      completed: 'pending',
    };
   
    dispatch(addTask(task))
    .then(() => {
       setNewTask('');
       dispatch(getTasks({ page: 1 }))
       toast.success('Task added successfully');
    })
    .catch((error) => {
        toast.error("Error adding task.");
    })
   
  };

  const handleToggleTask = async (task: Task) => {
    dispatch(updateTask(task))
    .then(() => {
      dispatch(getTasks({ page: 1 }))
      toast.success('Task updated successfully');
      
   })
   .catch((error) => {
       toast.error("Error adding task.");
   })
  };

  const handleDeleteTask = async (taskId: string) => {
    dispatch(deleteTask(taskId))
    .then(() => {
       dispatch(getTasks({ page: 1 }))
        toast.success('Task deleted successfully');
    })
    .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Error deleting task.");
    })
    
  };

  const handlePageChange = (page:any) => {
    // setCurrentPage(page);
    // Fetch data for the new page here...
    dispatch(getTasks({ page:page }))
   
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex items-center gap-4">
               {session && <span className="text-sm text-gray-600">{session.email}</span>}
              <button
                onClick={() => {
                  Cookies.remove("token", { path: "/" });
                  localStorage.removeItem("session"); // Clear local storage
                  navigate("/auth");
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>

          <form onSubmit={handleAddTask} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 rounded-md border  ring-blue-500 px-3"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className=" ">
      <div className="mb-4 flex gap-2  ">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-1/2 lg:w-1/3"
         onChange={(e) => dispatch(getTasks({ title:e.target.value }))}
        />
        <select
          className="border p-2 rounded w-1/2 lg:w-1/3"
           onChange={(e) => dispatch(getTasks({ status:e.target.value }))}
        >
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      
    </div>

          <div className="space-y-3">
            {tasks?.tasks?.map((task:any) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => handleToggleTask(task)} className={`text-lg ${task.status==="completed" ? 'text-green-500' : 'text-gray-400'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <span className={`${task.status==="completed" ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </span>
                </div>
                <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='py-5'>
            {/* ... your other content ... */}
            <Pagination
                totalPages={tasks.totalpages}
                currentPage={tasks.currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    </div>
  );
}

export default Task;