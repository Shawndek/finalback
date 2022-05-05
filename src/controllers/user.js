
export const getUser = async (req, res) => {
    res.json({user: req.user})
    }

/*     export const getUserDetails = async (req, res) => {
      try {
          const {
              params: { username },
              body: { email, password, lastname, firstname, address, postalcode, city, about, profile_pic }
              } = req;
          const { rows: userDetails } = await pool.query('SELECT * FROM users WHERE username =$1', [
              username
              ]);
          res.json(userDetails);
          } catch (error) {
          res.status(500).json({ error: error.message });
          }
      }

export const updateUser = async (req, res) => {
    try {
      const {
        params: { userid },
        body: { username, category, title, text, compensation, comment, pic1 }
      } = req;
      const { rowCount: found } = await pool.query('SELECT * FROM Users WHERE id = $1', [userid]);
      if (!found) {
        throw new Error(`The User you are trying to update doesn't exist`);
      }
       if (!title || !author || !category || !imageurl) {
        throw new Error('Invalid body');
      } 
      const {
        rows: [User]
      } = await pool.query(
        'UPDATE Users SET title = $2, author = $3, category = $4, imageurl = $5 WHERE id = $1 RETURNING *',
        [userid, userid, category, title, text, compensation, comment, pic1]
      );
      res.json(User);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      const {
        params: { userid }
      } = req;
      const { rowCount } = await pool.query('DELETE FROM Users WHERE id = $1 RETURNING *', [userid]);
      if (rowCount) {
        return res.json({ msg: `User with id of ${userid} was deleted` });
      } else {
        throw new Error(`User with id of ${userid} doesn't even exist`);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      ;
    }
  }; */