import { RootState, Section, User } from 'src/config/types/types';

export default function mapStateToProps(state: RootState): { user: User<string, Section> } {
    const user: User<string, Section> = state.user;
    return { user };
}
