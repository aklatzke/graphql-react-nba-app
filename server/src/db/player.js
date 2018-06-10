import db from './connection';

let collection = db.collection('players');

let methods = {
    all : () => collection.find({}),

    one: (id) => collection.find({ _id: db.ObjectId(id) }),

    byIds: (ids) => {
        ids = ids.map( item =>  db.ObjectId(item))
        
        return collection.find({ 
            _id : {
                $in: ids
            }
        })
    },

    byTeam: (team) => collection.find({ team: team })
}

export default methods;