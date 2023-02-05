import React, { useEffect, useState } from 'react';
import './App.css';
import storage from './../storage';

const init = {
  name: '',
  email: '',
  group: '',
};
const App = () => {
  const [value, setValue] = useState({ ...init });
  const [result, setResult] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult([...result, { ...value }]);
    setValue({ ...init });
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  let filterData = [];
  if (filter === 'All') {
    filterData = result;
  } else {
    filterData = result.filter((item) => item.group === filter);
  }

  if (search) {
    filterData = filterData.filter(
      (item) => item.name.includes(search) || item.email.includes(search)
    );
  }

  useEffect(() => {
    storage.sava('contact', filterData);
  }, [filterData]);

  return (
    <div>
      <h1>Contact App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Enter your Name</label>
          <input
            type="text"
            placeholder="name"
            id="name"
            name="name"
            value={value.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Enter your Email</label>
          <input
            type="email"
            placeholder="email"
            id="name"
            name="email"
            value={value.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="group">Chose group</label>
          <select
            name="group"
            id="group"
            onChange={handleChange}
            value={value.group}
          >
            <option value="">select</option>
            <option value={'Home'}>Home</option>
            <option value={'Office'}>Office</option>
          </select>
        </div>
        <button type="submit">Create Contact</button>
      </form>
      <div>
        <div>
          <h2>List of Contact</h2>
          <select
            name="group"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="">None</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div>
          <label htmlFor="search">Search contact</label>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <table style={{ borderCollapse: 'separate', borderSpacing: '2em 1em' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {filterData?.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td> {item.email}</td>
                <td> {item.group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
