var ioc = {
	// 读取配置文件
	config : {
		type : "org.nutz.ioc.impl.PropertiesProxy",
		fields : {
			paths : [ "jdbc.properties" ]
		}
	},
	// 数据源
	dataSource : {
		type : "com.mchange.v2.c3p0.ComboPooledDataSource",
		events : {
			depose : "close"
		},
		fields : {
			driverClass : {
				java : "$config.get('db-driver')"
			},
			jdbcUrl : {
				java : "$config.get('db-url')"
			},
			user : {
				java : "$config.get('db-username')"
			},
			password : {
				java : "$config.get('db-password')"
			},
			initialPoolSize : 10,
			maxPoolSize : 100,
			idleConnectionTestPeriod : 28800

		}
	},
	// Dao
	dao : {
		type : 'org.nutz.dao.impl.NutDao',
		args : [ {
			refer : "dataSource"
		} ]
	},
	fileUtils : {
		type : 'com.muzhiliwu.utils.FileUtils',
		fields : {
			sc : {
				app : '$servlet'
			}
		// 将 ServletContext 对象注入 MyUtils
		}
	},
	tmpFilePool : {
		type : 'org.nutz.filepool.NutFilePool',
		args : [ {
			java : '$fileUtils.getPath("/WEB-INF/tmp")'
		}, 1000 ]
	// 调用 MyUtils.getPath 函数
	},

	uploadFileContext : {
		type : 'org.nutz.mvc.upload.UploadingContext',
		singleton : false,
		args : [ {
			refer : 'tmpFilePool'
		} ],
		fields : {
			// 是否忽略空文件, 默认为 false
			ignoreNull : true,
			// 单个文件最大尺寸(大约的值，单位为字节，即 1048576 为 1M)
			maxFileSize : 104857600,
			// 正则表达式匹配可以支持的文件名
			nameFilter : '^(.+[.])(gif|jpg|png|doc|pdf|docx|xlsx|xls|dat|apk|txt)$'
		}
	},
	myUpload : {
		type : 'org.nutz.mvc.upload.UploadAdaptor',
		singleton : false,
		args : [ {
			refer : 'uploadFileContext'
		} ]
	},
	uploadFileContext2 : {
		type : 'org.nutz.mvc.upload.UploadingContext',
		singleton : false,
		args : [ {
			refer : 'tmpFilePool'
		} ],
		fields : {
			// 是否忽略空文件, 默认为 false
			ignoreNull : true,
			// 单个文件最大尺寸(大约的值，单位为字节，即 1048576 为 1M)
			maxFileSize : 104857600,
			// 正则表达式匹配可以支持的文件名
			nameFilter : '^(.+[.])(wav|pcm|tta|flac|au|ape|tak|mp3|wma|ogg|aac|mid|avi|dat|mkv|flv|vob|wmv|asf|asx|rm|rmvb|mpg|mpeg|mpe|3gp|mov|mp4|m4v)$'
		}
	},
	myUpload2 : {
		type : 'org.nutz.mvc.upload.UploadAdaptor',
		singleton : false,
		args : [ {
			refer : 'uploadFileContext2'
		} ]
	}

};