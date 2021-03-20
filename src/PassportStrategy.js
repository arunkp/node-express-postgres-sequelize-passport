export default function () {
  return new LocalStrategy(
    { usernameField: "email" },
    (email, password, done) => {
      mysqlConnection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        function (error, results, fields) {
          if (error) throw error;
          var user = results[0];
          if (!user) {
            return done(null, false, { message: "Invalid credentials.\n" });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Invalid credentials.\n" });
          }
          return done(null, user);
        }
      );
    }
  );
}
