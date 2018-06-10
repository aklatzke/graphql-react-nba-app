import routes from './router';
import players from './players';
import main from './main';

let router;

router = players(routes);
router = main(router);

export default router;