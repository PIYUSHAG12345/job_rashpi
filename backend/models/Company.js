import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: String,
    description: String,
    industry: String,
    website: String,
    location: String,
});

const Company = mongoose.model('Company', companySchema);

export default Company;
