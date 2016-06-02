/* jshint node: true, esnext: true */

exports.home = (req, action) => {
        if (!req.isAuthenticated()) return action === 'access home page';
    };
        
exports.authenticated = (req, action) => {
        if(req.isAuthenticated() && action != 'access judge pages' && action != 'access admin pages')
            return true;
    };
 
exports.judge = (req) => {
      if (req.user.role === 'Sedzia') {
        return true;
      }
    };
 
exports.administrator = (req)  => {
      if (req.user.role === 'Administrator') {
        return true;
      }
    };