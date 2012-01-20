# simple finance manager

一个简单的用了6小时开发的简单财务记录程序。

前台使用的javascript为jQuery1.62，后台环境为php+mySQL。

------

所定义的函数userlist用作初始化用户列表，作为用户列表下拉框的内容。此函数用在初始化及新建用户完毕时的刷新。

函数eventlist用作加载所有的财务信息。此函数作初始化及点击“查看全部”按钮之用。

函数eventlist_user用作加载特定用户的财务信息。此特定用户从#userbox下的.userselect中选择。该函数只用在点选“查看用户”按钮。

数据交互用json格式进行。

BTW，当中focusAndBlur的定义与此建议财务管理系统主要操作无关，可忽略之。

数据库结构：
* 在finace数据库下有event、staff、total三表。
* 表event下有字段fid（每个财务记录的id）、uid（产生该记录的用户id）、money（该记录的涉及金额）、time1（录入记录时的详细时间，用在取出记录时的排序，及方便仔细查阅）、time2（只记录日期，用作前段的按日期分出表格）、info（该记录的相关事宜）。
* 表staff下有字段uid（用户唯一id）、nickname（用户昵称）、regtime（用户注册时间）。
* 表total下有total（每次记录都进行一次结算）、time1（参见event表）、time2（参见event表）、fid（产生该total记录的在event表对应的记录）
