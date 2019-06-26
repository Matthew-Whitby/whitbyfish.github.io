lista=[]
def perfecto():

    ent=int(input("ingrese numero entero(rango):"))
    for i in range(1, ent+1):
        b=0
        for j in range(1, (i//2)+1):
            if((i%j)==0):
                b= b+j
        if(b==i):
            lista.append(i)
    print("Numeros perfectos:",lista)
perfecto()