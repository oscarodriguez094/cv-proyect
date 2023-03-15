import db from '../../database';
import { ISkill, Skill, SkillDescription } from '@/Back/models';
import mongoose from 'mongoose';
import { ISkillDescription } from '../../models/SkillDescription';

export type SkillDaoResponse = {
	result: boolean;
	skill?: ISkill;
	error?: any;
};
export const createSkill = async (skill: ISkill): Promise<SkillDaoResponse> => {
	try {
		const transaction = async (): Promise<ISkill | null> => {
			try {
				const skillDao: ISkill = await new Skill(skill).save({ session });
				console.log(skillDao);
				const skillDescription: ISkillDescription | null = await SkillDescription.findByIdAndUpdate(
					skillDao.skillDescriptionId,
					{
						$push: { skills: skillDao }
					},
					{ runValidators: true }
				).session(session);
				if (skillDescription) {
					await session.commitTransaction();
					return skillDao;
				}
				await session.abortTransaction();
				return null;
			} catch (e) {
				await session.abortTransaction();
				return null;
			}
		};
		db.connect();
		const session = await mongoose.startSession();
		session.startTransaction();
		const skillDao: ISkill | null = await transaction();
		session.endSession();
		db.disconnect();
		if (skillDao) return { result: true, skill: skillDao };
		return { result: false, error: 'No se ha podido insertar' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const findSkillById = async (id: string): Promise<SkillDaoResponse> => {
	try {
		db.connect();
		const skillDao: ISkill | null = await Skill.findById(id);
		db.disconnect();
		if (skillDao) return { result: true, skill: skillDao };
		return { result: false, error: 'El trabajo que buscas no existe' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const updateSkill = async (id: string, skillRequest: ISkill): Promise<SkillDaoResponse> => {
	try {
		db.connect();
		const skillUpdated: ISkill | null = await Skill.findByIdAndUpdate(id, skillRequest, { runValidators: true, upsert: true, new: true });
		db.disconnect();
		if (skillUpdated) return { result: true, skill: skillUpdated! };

		return { result: false, error: 'El skill que buscas no existe' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};

export const deleteSkillById = async (id: string): Promise<SkillDaoResponse> => {
	try {
		db.connect();
		const transaction = async (): Promise<ISkill | null> => {
			try {
				const skill: ISkill | null = await Skill.findByIdAndDelete(id).session(session);
				if (skill) {
					const skillDescription: ISkillDescription | null = await SkillDescription.findByIdAndUpdate(
						skill.skillDescriptionId,
						{
							$pullAll: {
								skills: [skill._id]
							}
						},
						{ new: true }
					).session(session);
					if (skillDescription && skillDescription.skills) {
						await session.commitTransaction();
						return skill;
					}
				}
				await session.abortTransaction();
				return null;
			} catch (e) {
				await session.abortTransaction();
				return null;
			}
		};
		db.connect();
		const session = await mongoose.startSession();
		session.startTransaction();
		const skill: ISkill | null = await transaction();
		session.endSession();
		db.disconnect();

		if (skill) return { result: true, skill: skill };

		return { result: false, error: 'El trabajo que buscas no existe' };
	} catch (e) {
		db.disconnect();
		return { result: false, error: e };
	}
};
