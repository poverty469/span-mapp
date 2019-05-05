#create empty file to be writen to
file = open("districts_id.json", "w")
count = 0

#read original file
with open('districts_lang_005_7.json', 'r')as myfile:
    for line in myfile:

       #lines that don't need to be edited with an 'id'
       if not line.startswith('{ "type": '):
            file.write(line)
       else:
            #lines that need to be edited
            count = count +1
            idNr = str(count)
            file.write(line[0:20] + '"id":'+ '"'+ idNr + '",' +line[21:])

file.close()