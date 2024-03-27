// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import Mainbreadcrumbs from 'contants/Mainbreadcrumbs';

// ==============================|| TYPOGRAPHY ||============================== //

const Account = () => (
  <>
    <Mainbreadcrumbs title={"Account"} />
    <MainCard
      secondary={
        <SecondaryAction link="https://next.material-ui.com/system/typography/" />
      }
    >
      <div>Account</div>
    </MainCard>
  </>
);

export default Account;
