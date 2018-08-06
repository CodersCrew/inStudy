import { styles } from 'CC-UI/lib/utils';
import enhanceHead from './enhanceHead';

export default fa => {
  if (fa === 'free') {
    enhanceHead('link', {
      rel: 'stylesheet',
      href: 'https://use.fontawesome.com/releases/v5.0.12/css/all.css',
      integrity: 'sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9',
      crossorigin: 'anonymous',
    });
    styles.setValue('--fa-light', '600');
  } else if (fa === 'local') {
    enhanceHead('link', {
      rel: 'stylesheet prefetch',
      href: 'https://static.fontawesome.com/css/fontawesome-app.css',
    });
    enhanceHead('link', {
      rel: 'stylesheet prefetch',
      href: 'https://pro-staging.fontawesome.com/releases/v5.0.8/css/all.css',
    });
    styles.setValue('--fa-light', '300');
  } else {
    enhanceHead('link', {
      rel: 'stylesheet',
      href: 'https://pro.fontawesome.com/releases/v5.0.12/css/all.css',
      integrity: fa,
      crossorigin: 'anonymous',
    });
    styles.setValue('--fa-light', '300');
  }
  return true;
};
