import { RootState, User } from 'src/config/types/types';

export default function mapStateToProps(state: RootState) {
    const user: User = state.user;
    return { user };
}
