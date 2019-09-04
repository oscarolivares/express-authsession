/**
 * Return a promise, then resolved it in 3 possible levels of password strength
 * as a string ('strong', 'regular' and 'weak')
 *
 * Strong passwords specs:
 *
 * - Minimun length of 8 characters
 * - At least one lowercase letter (a-z)
 * - At least one uppercase letter (A-Z)
 * - At least one digit (0-9)
 * - At least one of these symbols (!@#$%^&*.,)
 *
 * Stong password example: Test123!
 *
 * Regular passwords specs:
 *
 * - Minimun length of 6 characters
 * - Must have at least one of the following combinations:
 *  1. Lowercase and uppercase letters [a-z + A-Z]. (e.g. Tester)
 *  2. Lowecase letters and digits [a-z + 0-9]. (e.g. test22)
 *  3. Uppercase letters and digits [A-Z + 0-9]. (e.g. TEST22)
 *  4. A combination of the above. (e.g. Test22)
 *
 * *If the password does not return a strong or regular value it is considered
 * a Weak passwords*
 */

module.exports = function testPasswordStrength(password) {
  return new Promise((resolve, reject) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})'
    );
    const mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );

    if (strongRegex.test(password)) {
      resolve('strong');
    } else if (mediumRegex.test(password)) {
      resolve('regular');
    } else {
      resolve('weak');
    }
  });
};
