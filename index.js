const fs = require('fs')
const stream = require('stream');

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

})







rl.question('Enter the diirectory name', (name) => {
    console.log(` name is ${name}`)
    fs.readdir(name, (err, file) => {
        if (err) {
            console.log('some error occured')
            console.log(err.message)
        }
        else {
            // console.log(file)
            let i = 0;
            file.forEach(element => {
                console.log(i++, `${element}`)
            });


            rl.question('Enter the file no that is to be copied ', (number) => {

                fs.readdir(name, (err, file) => {
                    if (err) {
                        console.log(err.message)
                    }
                    else {
                        const textfile = file[parseInt(number)]
                        console.log(`${textfile}`)
                        rl.question('Enter the  destination directory', (destdir) => {
                            console.log(`${destdir}`)
                            const readStream = fs.createReadStream(`./${name}/${textfile}`)

                            //  const textfile2 = destdir[parseInt(number)]
                            const writeStream = fs.createWriteStream(`./${destdir}/${textfile}`)

                            readStream.on('data', (chunk) => {
                                writeStream.write(chunk)
                            })

                            readStream.on('end', () => {
                                console.log('file read complete')
                                writeStream.end();
                                console.log('file write complete')
                            })
                        })
                    }
                })
            })
        }
    })
})







