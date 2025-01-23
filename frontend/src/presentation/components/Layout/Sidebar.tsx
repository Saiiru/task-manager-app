'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Auth/AuthContext';
import { useGlobalState } from '@/context/GlobalStateContext';
import { bars, arrowLeft, search } from '@/utils/Icons';
import Image from 'next/image';

const filters = [
  {
    id: 'all',
    name: 'All Tasks',
    icon: bars,
  },
  {
    id: 'incomplete',
    name: 'In Progress',
    icon: arrowLeft,
  },
  {
    id: 'completed',
    name: 'Completed',
    icon: search,
  },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, activeFilter, setActiveFilter } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Implement search logic in your tasks context
  };

  return (
    <aside className="w-64 bg-[#212121] min-h-screen p-4">
      <div className="flex items-center space-x-4 mb-8">
        {user?.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-600"></div>
        )}
        <div>
          <h2 className="text-white font-semibold">{user?.name}</h2>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-lg bg-[#181818] text-white border border-gray-700"
        />
      </div>

      <nav className="space-y-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`w-full flex items-center px-4 py-2 rounded-lg text-left transition-colors
              ${
                activeFilter === filter.id
                  ? 'bg-[#27AE60] text-white'
                  : 'text-gray-400 hover:bg-[rgba(249,249,249,0.03)]'
              }`}
          >
            {filter.icon}
            <span className="ml-3">{filter.name}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-auto w-full flex items-center px-4 py-2 text-red-400 hover:bg-[rgba(249,249,249,0.03)]"
      >
        Sign Out
      </button>
    </aside>
  );
}

export default Sidebar;
