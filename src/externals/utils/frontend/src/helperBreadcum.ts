



export function pathToBreadcumbNavigations(router: string) {
    const prevPaths = router.split('?')[0].split('/')
    const prevAsPaths = router.split('/')


    return prevPaths.map((prevPath, indexPrevPath) => {
        var label = '', url = '';
        switch (indexPrevPath) {
            case 1:
                url = `/${prevPaths[1]}`
                label = 'dashboard';
                break;
            case 2:
                url = `/${prevPaths[1]}/${prevPaths[2]}`
                label = prevPath;
                break;
            case 3:
                if (prevAsPaths?.[3]?.includes('[') && prevAsPaths?.[3]?.includes(']')) {
                    label = `detail ${prevPaths[2]}`;
                } else if (prevPath == 'data') {
                    label = prevPaths?.[4] ? `detail ${prevPaths[2]}` : `tambah ${prevPaths[2]} baru`;
                } else if (prevPath == 'manage') {
                    label = `Manage ${prevPaths[2]}`;
                }
                break;
        }
        return {
            url,
            label: label.replace('-', ' ')
        }
    }).filter((prevPath) => (prevPath.label));
}