import routes from './router';
import players from './players';
import main from './main';
import parser from '../extra/parser';

let router;

router = players(routes);
router = main(router);

routes.get('/parse', () => {
    parser();
})

export default router;