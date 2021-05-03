import Development from './Development.env';
import Production from './Production.env';

function Config() {
      if (process.env.NODE_ENV == 'development') {
            return Development
      } else {
            return Production
      }
}

module.exports = Config


// module.exports = () => require(`../env/${ process.env.NODE_ENV }.env.${extension}`);

//   function Config():any {
//       return require(`../env/${process.env.NODE_ENV}.env.${extension}`)
// }

// module.exports = Config