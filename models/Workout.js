const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
	{
		day: {
			type: Date,
			default: Date.now
		},
		exercises: [
			{
				type: {
					type: String,
					trim: true,
					required: "Exercise type is Required"
				},
				name: {
					type: String,
					trim: true,
					required: "Exercise name is Required"
				},
				duration: {
					type: Number,
					required: "Duration type is Required"
				},
				weight: {
					type: Number
				},
				reps: {
					type: Number
				},
				sets: {
					type: Number
				},
				distance: {
					type: Number
				}
			}
		]
	},
	{
		toJSON: {
			virtuals: true
		}
	}
);

workoutSchema.virtual("totalDuration").get(function() {
	return this.exercises.reduce((total, exerice) => {
		return total + exerice.duration;
	}, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
