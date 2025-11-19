export default {
  dyform: {
    header: {
      imp: '导入',
      exp: '导出',
      clear: '清空',
      preview: '预览',
      edit: '继续编辑',
      export_code: '导出代码',
      template_data: '模板数据',
      get_data: '获取数据',
      write_mode: '填写模式',
      read_mode: '查看模式',
      prompt: '提示',
      clear_prompt: '是否要清空当前面板?',
      content_not_empty: '内容不能为空',
      content_parse_error: '内容解析异常，请检查文本内容',
      undo: '撤销',
      redo: '重做',
      noUndo: '暂无可撤回内容',
      noRedo: '无法重做',
      save: '保存',
      conditional_cascade: '条件级联',
      empty_prompt: '请先设计表单'
    },
    close: '关闭',
    confirm: '确定',
    cancel: '取消',
    import: '导入',
    validator: '效验',
    open_properties_panel: '打开属性配置面板',
    close_properties_panel: '隐藏属性配置面板',

    select_item: '从左侧选择组件拖入',

    properties: {
      feature_property: '组件属性',
      form_property: '表单属性',

      select: '请选择',

      size: '尺寸',
      label_position: '对齐方式',
      left: '左对齐',
      right: '右对齐',
      top: '顶部对齐',
      label_width: '标签宽度',
      label_suffix: '标签后缀',
      validate_prompt: '效验提示',
      validate_prompt_tip:
        '是否打开element-ui中hide-required-asterisk开关，即 是否隐藏必填字段的标签旁边的红色星号',
      open: '打开',
      close: '关闭',
      dynamics_validate_label: '动态校验标签',
      dynamics_validate_label_tip:
        '此开关在打开hide-required-asterisk时，是否将标签旁边的红色星号跟随组件的校验规则一起显示',
      output_hidden: '输出隐藏组件值',
      output_hidden_tip:
        '当存在动态隐藏的组件时，此开关决定隐藏的组件中的值是否将被忽略删除',
      form_style: '表单样式',
      tip: '提示',
      result_tip: '实际预览效果请点击预览查看',
      no_feature: '请先从面板中选择组件',
      event: '事件',
      listen: '监听',
      dynamics: '动态配置',
      focus_event: '获取焦点',
      blur_event: '失去焦点',
      listen_model: '监听组件',
      feature_model: '组件model',
      feature_model_tip: '多个组件使用,分割',
      listen_script: '触发表达式',

      dynamic_visible: '动态显示',
      dynamic_visible_tip: '请输入显示条件,$表示当前整个表单的绑定数据',
      dynamic_disabled: '动态禁用',
      dynamic_disabled_tip: '请输入禁用条件,$标识当前整个表单的绑定数据',
      dynamic_visible_script: '显示条件',
      disabled_visible_script: '禁用条件',

      data: '数据',
      data_config: '数据配置',
      method_post_tip: 'post请求需要携带的数据(JSON格式)',
      script: '表达式',
      add: '新增',
      edit_hidden: '编辑时隐藏',
      preview_hidden: '查看时隐藏'
    },

    rules: {
      required: '必填',
      required_message: '必填校验提示信息',
      regular: '正则',
      regular_tip: '正则表达式不要带前后的/',
      regular_placeholder: '正则表达式pattern',
      script: '表达式',
      script_tip: '表达式中$表示全局表单数据,$row表示在动态表格内单行的数据',
      script_placeholder: '条件表达式',
      message_tip: '提示信息',
      add_rule: '添加条件',
      label_msg: '请输入字段名称',
      model_msg: '请输入字段英文名',
      model_custom_msg:
        '仅支持字母开头，支持输入大小字母、数字、下划线，且最大长度50字符。',
      format_validate: '格式验证',
      invalid_validate: '无格式验证',
      common_validate: '常规验证',
      regex_validate: '自定义正则'
    },

    item: {
      label_in_value: '存储选项值的标识',
      tip_msg: '说明信息',
      dynamicLabel: '动态标签',
      label: '字段名称',
      label_width: '标签宽度',
      width: '填充宽度',
      span: '所占栅格',
      model: '字段英文名',
      key: '标识',
      options: '属性',
      if_hidden: '是否隐藏',
      if_disabled: '是否禁用',
      validate_rule: '效验规则',
      required: '请输入内容',
      default_value: '默认值',
      placeholder: '输入提示',
      placeholder_input: '请输入',
      placeholder_select: '请选择',
      name: '名称',
      value: '值',
      connection: '连接',
      keyword: '输入关键字进行过滤',

      select_config: '选项配置',
      datasource: '数据源',
      datatable: '数据表',
      datasource_static: '自定义',
      dataset: '数据集',
      datafield: '数据字段',
      datasource_dict: '数据字典',
      method_type: '方法类型',
      post_data: 'Post携带数据',
      dict_type: '字典分类',

      api_path: 'API地址',
      data_path: '数据路径',
      filed_value: '值字段',
      filed_label: '标签字段',
      filed_children: '下级字段',

      multiple: '多选',
      search: '搜索',
      online_search: '在线搜索',
      online_search_query: '参数KEY',
      clearable: '可清除',
      editable: '可编辑',

      linkage: '联动关联',
      linkage_title: '联动',

      yes: '是',
      no: '否',
      left: '左',
      center: '居中',
      right: '右',
      add: '新增',
      copy: '复制',
      delete: '删除',
      edit: '修改',
      view: '查看',

      local: '本地',
      remote: '远程',
      linkage_column: '关联字段',

      max_length: '最大长度',

      style: '样式Style',
      class: '样式Class',
      bordered: '边框',

      application: '应用组件',
      basic: '基础组件',
      decorate: '高级组件',
      layout: '布局组件',
      custom_components: '自定义组件',

      height: '高度',
      max_height: '最大高度',

      validate_msg: '当前配置项内容未填写完整，请完善后再操作',

      checkbox: {
        name: '多选'
      },
      date: {
        name: '时间',
        date_type: '时间类型',
        date_format: '时间格式',
        value_format: '值时间格式',
        value_format_placehoder: '默认是Date类型',
        align: '对齐方式',
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分',
        second: '秒',
        select_limit: '选择限制',
        system_time_before: '系统时间前',
        system_time_after: '系统时间后',
        step_range: '偏移范围',
        step_range_before: '前偏移',
        step_range_after: '后偏移',
        suffix: '毫秒',
        placeholder: '选择时间',
        satrt_placeholder: '开始时间',
        end_placeholder: '结束时间'
      },
      datePicker: {
        name: '时间'
      },
      daterange: {
        name: '时间范围'
      },
      input: {
        name: '单行文本',
        input_type: '输入类型',
        prepend: '前缀',
        append: '后缀',
        placeholder: '请输入'
      },
      phone: {
        name: '手机号'
      },
      email: {
        name: '邮箱'
      },
      idcard: {
        name: '身份证'
      },
      filltime: {
        name: '填报时间'
      },
      number: {
        name: '数字(整数)',
        precision: '精度',
        step: '步长',
        min: '最小值',
        max: '最大值',
        append: '后缀'
      },
      decimal: {
        name: '数字',
        precision: '小数位数'
      },
      button: {
        name: '按钮',
        size: '尺寸',
        align: '排列方式',
        type: '类型',
        plain: '朴素',
        round: '圆角',
        circle: '圆形',
        click_control: '点击功能',
        reset: '重置表单',
        custom: '自定义',
        event: '事件',
        event_name: '事件名称',
        script: '执行脚本'
      },
      editor: {
        name: '富文本',
        if_html: 'Html预览'
      },
      radio: {
        name: '单选',
        clear_default_tip: '清空默认值'
      },
      rate: {
        name: '评分',
        max: '档数',
        allow_half: '允许半选',
        default_value: '起始值',
        show_score: '显示分数'
      },
      select: {
        name: '单选下拉',
        placeholder: '请选择',
        confirm_tip: '确认删除',
        confirm_msg: '此操作将会导致相关级联配置受影响，请谨慎修改'
      },
      multipleSelect: {
        name: '多选下拉',
        multipleLimit: '最大可选数'
      },
      slider: {
        name: '进度',
        min: '起始值',
        max: '目标值',
        show_input: '输入框',
        marks: '标记',
        step: '步长'
      },
      switch: {
        name: '开关',
        active_text: '选中标签',
        inactive_text: '未选中标签'
      },
      textarea: {
        name: '多行文本',
        rows: '行数',
        autosize: '自动高度'
      },
      time: {
        name: '时间',
        time_format: '时间格式'
      },
      upload: {
        upload_type: '上传类型',
        file_name: '附件',
        bucket: '存储桶',
        img_name: '附件',
        upload_url: '上传地址',
        file_type: '文件类型',
        file_url_path: 'URL地址',
        file_id_path: 'ID地址',
        file_url_path_placeholder: '必填,上传成功后解析文件url的epl地址',
        file_id_path_placeholder: '选填,上传成功后解析文件ID的epl地址',
        limit_size: '文件大小限制',
        multiple: '多文件',
        limit: '文件数量',
        accept: '文件后缀限制',
        header: '携带头信息',
        style: '样式',
        upload_hidden: '上传后隐藏',
        select: '选择文件',
        error_max_size: '上传文件大小不能超过',
        error_not_found_file: '找不到文件下载路径',
        error_img_filetype: '当前图片格式只支持:',
        btn: '按钮',
        card: '卡片'
      },
      alert: {
        name: '提示',
        title: '标题',
        default: '提示标题',
        description: '辅助文字',
        type: '类型',
        success: '成功',
        warning: '告警',
        info: '信息',
        error: '异常',

        effect: '主题',
        light: '高亮',
        dark: '暗黑',
        closable: '可关闭',
        close_text: '关闭文本',
        close_text_placeholder: '不需要则不填',
        center: '居中',
        show_icon: '显示图标'
      },
      divider: {
        name: '分割线',
        direction: '方向',
        horizontal: '横向',
        vertical: '竖向',
        orientation: '标签位置'
      },
      text: {
        text_align: '对齐方式',
        font_size: '字体大小',
        required_mark: '必选标记',
        required_mark_script: '动态必选',
        bold: '加粗'
      },
      link: {
        name: '超链接',
        href: '跳转链接',
        type: '类型',
        underline: '下滑线',
        icon: '图标',
        default: '默认链接',
        primary: '主要链接',
        success: '成功链接',
        warning: '警告链接',
        danger: '危险链接',
        info: '信息链接'
      },
      grid: {
        name: '分栏布局',
        columns: '栅格',
        gutter: '间隔',
        config: '分栏设置',
        no_support: '不支持嵌套分栏布局'
      },
      department: {
        name: '部门'
      },
      person: {
        name: '人员'
      }
    }
  }
};
