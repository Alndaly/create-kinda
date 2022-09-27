import spawn from 'cross-spawn';

export function install(root: string, dependencies: any[]) {
    return new Promise((resolve, reject) => {
        let command = 'npm';
        let args = [
            'install',
        ].concat(dependencies);

        const child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', (code: number) => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`,
                });
                return;
            }
            resolve(null);
        });
    })
}