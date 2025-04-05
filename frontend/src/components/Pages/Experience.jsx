import React, { useState, useEffect } from 'react';
import './Experience.css';
import axios from 'axios';

const Experience = () => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [searchCompany, setSearchCompany] = useState('');
    const [filteredExperiences, setFilteredExperiences] = useState([]);

    // Fetch experiences from the backend
    useEffect(() => {
        axios.get('https://job-rashpi-2-frontend.onrender.com/user/experiences')
            .then(response => {
                setExperiences(response.data);
                setFilteredExperiences(response.data);
            })
            .catch(error => console.error('Error fetching experiences:', error));
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExperience = { name, company, title, experience };
        try {
            const response = await axios.post('https://job-rashpi-2-frontend.onrender.com/user/experiences', newExperience);
            const updatedExperiences = [...experiences, response.data];
            setExperiences(updatedExperiences);
            setFilteredExperiences(updatedExperiences);
            setName('');
            setCompany('');
            setTitle('');
            setExperience('');
        } catch (error) {
            console.error('Error adding experience:', error);
        }
    };

    // Handle delete experience
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://job-rashpi-2-frontend.onrender.com/user/experiences/${id}`);
            const updatedExperiences = experiences.filter(exp => exp._id !== id);
            setExperiences(updatedExperiences);
            setFilteredExperiences(updatedExperiences);
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    // Handle company name search
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchCompany(searchValue);
        if (searchValue === '') {
            setFilteredExperiences(experiences);
        } else {
            const filtered = experiences.filter(exp =>
                exp.company.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredExperiences(filtered);
        }
    };

    return (
        <div className="container">
            <h1 className="heading">Experience Management</h1>
            <input
                placeholder="Search by Company Name"
                value={searchCompany}
                onChange={handleSearch}
                className="search-input"
            />
            <form onSubmit={handleSubmit} className="form">
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
                <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="input" />
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
                <textarea placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="textarea" rows="4"></textarea>
                <button type="submit" className="button">Add Experience</button>
            </form>
            <div className="experience-list">
                {filteredExperiences.map((exp, index) => (
                    <div key={index} className="card">
                        <h2 className="card-title">Name: {exp.name}</h2>
                        <p className="card-company">Company: {exp.company}</p>
                        <p className="card-position">Title: {exp.title}</p>
                        <p className="card-description">Description: {exp.experience}</p>
                        <button className="delete-button" onClick={() => handleDelete(exp._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
