export const details: any = {
    1: {
        id: 1,
        Name: "ABCD",
        surName: "PQRS",
        userName: "ABRS",
        mailId: "ABCD@gmail.com",
        contact: 9876543210,
        technology: "Angular",
        mentor: "XYZ"
    },
    2: {
        id: 2,
        Name: "EFGH",
        surName: "LMNO",
        userName: "EFNO",
        mailId: "EFGH@gmail.com",
        contact: 9876543210,
        technology: "Angular",
        mentor: "PQR"
    },
};

export function findDetailsByMentor(mentor: string) {
    return details[mentor];
}
