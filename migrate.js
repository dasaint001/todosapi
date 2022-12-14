const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://todoapp:1234567890@todos.emrndvb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true,
});

const Todo = require('./models/todos');

(async () => {
    await Todo.updateMany(
        {user_id:{$exists:false}},
        {$set:{user_id:null}}
    );
    mongoose.disconnect();
})();