import { t } from '../../locale/index.js';
export function modelRules() {
  return [
    {
      required: true,
      message: t('dyform.rules.model_msg'),
      trigger: ['blur', 'change']
    },
    {
      validator: (rule, value, callback) => {
        if (!/^[a-zA-Z][a-zA-Z0-9_]{0,49}$/.test(value)) {
          callback(t('dyform.rules.model_custom_msg'));
        } else {
          callback();
        }
      }
    }
  ];
}

export function labelRules() {
  return [
    {
      required: true,
      message: t('dyform.rules.label_msg'),
      trigger: ['blur', 'change']
    }
  ];
}
