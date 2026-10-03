import React, { useState } from 'react'

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedStatus, setEditedStatus] = useState(task.status)

  const handleSave = () => {
    // Parent component ko updated task pass kar rahe hain
    if (onUpdateTask) {
      onUpdateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
        status: editedStatus,
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Changes revert karne ke liye
    setEditedTitle(task.title)
    setEditedDescription(task.description)
    setEditedStatus(task.status)
    setIsEditing(false)
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm mb-4 transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col gap-4">
        
        {isEditing ? (
          /* ================= INLINE EDIT FORM ================= */
          <div className="flex flex-col gap-3">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Select Input */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="to-do">to-do</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
              </select>
            </div>

            {/* Description Textarea Input */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Save / Cancel Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          /* ================= NORMAL DISPLAY VIEW ================= */
          <>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
                {task.title}
              </h3>
              <span className="self-start sm:self-auto shrink-0 rounded-md bg-gray-100 border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600">
                {task.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 bg-gray-50/80 p-3 rounded-md border border-gray-100 leading-relaxed">
              {task.description}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 mt-1 border-t border-gray-100">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTask && onDeleteTask(task._id)}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default TaskCard