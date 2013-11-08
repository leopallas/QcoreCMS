require ['jQuery', 'angular', 'admin/route'], ($, angular, app)->
    #TODO 加入后台首页
    ctrls = []
    routes = []

    $.getJSON '/api/admin.route', (json)->
        if false == json.success
            alert json.msg
            return

        for v in json.data.routes
            ctrls.push v.js
            routes.push v

        # 动态加载路由
        require ctrls, ->
            app.config ['$routeProvider', ($routeProvider) ->

                for v in routes
                    $routeProvider.when(v.uri,
                        controller: v.name,
                        templateUrl: v.tpl
                    )
            ]
            
            angular.bootstrap(document , ['adminApp'])
            
            return

        return

    return
 
