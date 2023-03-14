import mongoose, { Model, Schema, Types } from 'mongoose';

export interface IJob {
	_id: Types.ObjectId;
	descriptionTitle: string;
	description: string;
	startDate?: string;
	endDate?: string;
	developerId: string;
}

const jobSchema = new Schema({
	descriptionTitle: { type: String, required: true },
	description: { type: String, required: true },
	developerId: { type: String, required: true },
	startDate: { type: String },
	endDate: { type: String }
});

const JobModel: Model<IJob> = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default JobModel;
