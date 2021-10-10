import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() { 

    await prisma.user.createMany({
        data: [
            {
                // firstname: "Tom", 
                lastName: "Laufey", 
                email: "tom.laufey1982@hotmail.com", 
                password: "fPej51Vjea=ebenPqjbw3pqigo+me[", 
                verified: true
            },
            {
                firstName: "Tony",
                lastName: "Stank",
                email: "tonystank123@stankindustry.com",
                password: "Hbe34C4i)v-cvna2-cwt5+vH$szb",
                verified: true
            }, 
            {
                firstName: "Sylvie",
                lastName: "Johanson",
                email: "sylvievariant01@gmail.com",
                password: "S^gbtoqYbvL15+3V=gb{wIqdrE#iu",
                verified: true
            }, 
            {
                firstName: "Tom Marvolo",
                lastName: "Riddle",
                email: "lordvoldemort@hogwarts.com",
                password: "Vbz,0boemv>LiyD31b&vM%hb0g#R[ntT",
                verified: true
            }, 
            {
                firstName: "Jonathan",
                lastName: "Wich",
                email: "babayaga@gmail.com",
                password: "Jebv0_paqHNhbo20-Wblae#I1pjv&Ch4K",
                verified: true
            }, 
            {
                firstName: "Paul",
                lastName: "Nhan",
                email: "pnhan1@myseneca.ca",
                password: "ojbPfbtysAbrlb45%hp&^%UtoabhL#$",
                verified: true
            }, 
            {
                firstName: "Odeen von",
                lastName: "Rosen",
                email: "bestla.borr@asgard.com",
                password: "uoei343bVbt51#$vh70bns^unm&=",
                verified: true
            }, 
            {
                firstName: "Nathaniel",
                lastName: "Smith",
                email: "nathan.Smith@outlook.com",
                password: "ht#0h5uvn4(2bb0n5gh7s2+vriaph&%s",
                verified: true
            }, 
            {
                firstName: "John",
                lastName: "Majors",
                email: "kangtheconqueror@tva.com",
                password: "895tuitenla%$v05#79v3cl3",
                verified: true
            }, 
            {
                firstName: "Christopher",
                lastName: "Evans",
                email: "steve.rogers@hotmail.com",
                password: "Kyg1Lebvi6%^L301LyupLb3bR96$",
                verified: true
            },
            {
                firstName: "Denzel",
                lastName: "Washington",
                email: "theequalizer@hotmail.com",
                password: "Kyg1Lebvi6%^L301LyupLb3bR96$",
                verified: true
            }
        ]
    });

}

main()
.catch((e) => {

    console.log(e);
    process.exit(1);

})
.finally(() =>{

    prisma.$disconnect();
});
    



