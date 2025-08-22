import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./UsersList.module.sass";
import defImage from "./defaultPhoto.jpg";
import { useEffect } from "react";
import { getUserThunk } from "../../store/slices/usersSlice";

export const UsersList = ({ users, isFetching, error, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>!!!ERROR!!!</div>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <image
              className={styles.userImage}
              src={
                u.image ? `http://localhost:5000/images/${u.image}` : defImage
              }
              alt={`${u.firstName} ${u.lastName}`}
            />
            {JSON.stringify(u)}
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ usersData }) => usersData;

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUserThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
