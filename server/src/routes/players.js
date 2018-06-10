import db from '../db/';

let { players } = db;

export default ( routes ) => {
    routes.get("/api/players", (req, res) => {
        players
            .all()
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err.message)
            })
    })

    return routes;
};