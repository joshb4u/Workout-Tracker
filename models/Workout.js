const mongoose = require('mongoose')
const dB = mongoose.dB
const workoutdB = new dB(
    {
        day:{
            type: Date,
            default: Date.now
        },
        exercises:[
            {
                category:{
                    type: String,
                    trim: true,
                    required:'Exercise Category Required'
                },
                name:{
                    type: String,
                    trim: true,
                    required: 'Exercise Name Required'
                },
                duration:{
                    type: Number,
                    required: 'Exercise Duration Required'
                },
                weight:{
                    type: Number
                },
                reps:{
                    type: Number
                },
                sets:{
                    type: Number
                },
                distance:{
                    type: Number
                }
            }
        ]
    },
    {
        toJSON:{
            virtuals: true
        }
    }
)
workoutdB.virtual('totalDuration').get(function(){
    return this.exercises.reduce((total, exercise)=>{
        return total+exercise.duration
    },0)
})
const Workout = mongoose.model('Workout', workoutdB)
module.exports = Workout