// 后台Json数据入口

let data = {
    name: '一级目录',
    id: '0',
    fileType: 'folder',
    children: [
        { name: '二级节点', id: '1', fileType:'file'},
        { name: '二级节点', id: '2', fileType:'file'},
        {
            name: '二级目录',
            id: '3',
    		fileType: 'folder',
            children: [
            	{
                    name: '三级目录',
                    id: '3-1',
    				fileType: 'folder',
                    children: [
                        { name: '四级节点', id: '3-1-1', fileType:'file'},
                        { name: '四级节点', id: '3-1-2', fileType:'file'}
                    ]
                },
                { name: '三级节点', id: '3-2', fileType:'file'},
                { name: '三级节点', id: '3-3', fileType:'file'},
                {
                    name: '三级目录',
                    id: '3-4',
                    fileType: 'folder',
                    children: [
                        { name: '四级节点', id: '3-4-1', fileType:'file'},
                        { name: '四级节点', id: '3-4-2', fileType:'file'}
                    ]
                }
            ]
        },
        { name: '二级空目录', id: '4', fileType:'folder'}
    ]
}

export default data