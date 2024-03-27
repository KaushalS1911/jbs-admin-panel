// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import Mainbreadcrumbs from 'contants/Mainbreadcrumbs';

// ==============================|| TYPOGRAPHY ||============================== //

const Attendance = () => (
  <>
    <Mainbreadcrumbs title={"Attendance"} />
    <MainCard
      secondary={
        <SecondaryAction link="https://next.material-ui.com/system/typography/" />
      }
    >
      <div>Attendance</div>
    </MainCard>
  </>
);

export default Attendance;
