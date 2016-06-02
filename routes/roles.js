/* jshint node: true, esnext: true */

exports.home = (req, action) => {
        if (!req.isAuthenticated()) return action === 'access home page';
    };
 
exports.judge = (req) => {
      if (req.user.role === 'Sędzia') {
        return true;
      }
    };
 
exports.administrator = (req)  => {
      if (req.user.role === 'Administrator') {
        return true;
      }
    };