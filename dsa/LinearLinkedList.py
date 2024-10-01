"""
Created on Tue Mar 14 16:27:54 2023
@author: RONIT SINGH
Statement: Linear Linked List
"""
class Node:
    def __init__(self,data=None,next=None):
        self.data = data
        self.next = next

class LinearLinkedList:
    def __init__(self):
        self.head = None
    # Function to create a node at begining
    def insert_beg(self,num):
        self.head = Node(num,self.head)
        
    # Function to create a node at end
    def insert_end(self,num):
        node = Node(num)
        if self.head is None:
            self.head = node
        else:
            current_node = self.head
            while current_node.next is not None:
                current_node = current_node.next
            current_node.next =  node
            
    # Function to create a node at nTh position
    def insert_nth(self,pos,num):
        node = Node(num)
        
        if pos==1:
            node.next = self.head
            self.head = node
        else:
            current_node = self.head
            for i in range(pos-2):
                current_node = current_node.next
            node.next = current_node.next
            current_node.next = node           
        
    
    # Function to display the linked list
    def display(self):
        current_node = self.head
        while current_node is not None:
            print(current_node.data,end='->')
            current_node = current_node.next
        print("None")
        
    # Function to count the number of nodes
    def count(self):
        current_node = self.head
        i = 0
        while current_node is not None:
            i+=1
            current_node = current_node.next
        return i
    
    # Function to delete the node at beginning
    def delete_beg(self):
        if self.head is None:
            print("Linked List is Empty")
        else:
            current_node = self.head
            self.head = current_node.next
            del current_node
            
    # Function to delete the node at end
    def delete_end(self):
        if self.head is None:
            print("Linked List is Empty")
        else:
            current_node = self.head
            if current_node.next is None:
                self.head = current_node.next
                del current_node               
            else:
                while current_node.next.next is not None:
                    current_node = current_node.next
                node = current_node.next
                current_node.next = None
                del node
    # Function to delete a node from nth Position
    def delete_nth(self,pos):
        if self.head is None:
            print("Linked List is Empty")
        else:
            current_node = self.head
            if pos==1:
                self.head = current_node.next
                del current_node
            else:
                for i in range(pos-2):
                    while(current_node.next.next is not None):
                        current_node = current_node.next
                node = current_node.next
                current_node.next = node.next
                del node
            

link = LinearLinkedList()
while True:
    print("1. To insert at Begining")
    print("2. To display")
    print("3. To insert at end")
    print("4. To insert at nth")
    print("5. To count the nodes")
    print("6. To delete from begining")
    print("7. To delete from end")
    print("8. To delete from nth")
    print("0. To Exit")
    ch = int(input("Enter your choice : "))
    if ch==1:
        link.insert_beg(int(input("Enter a number you want to insert: ")))
    elif ch == 2:
        link.display()
    elif ch==3:
        link.insert_end(int(input("Enter a number you want to insert: ")))
    elif ch==4:
        pos = int(input("Enter the position: "))
        if pos>0 and pos<link.count()+1:
            link.insert_nth(pos, int(input("Enter a number you want to insert: ")))
        else:
            print("Out of bound position")
    elif ch==5:
        print("Count: ",link.count())
    elif ch==6:
        link.delete_beg()
    elif ch==7:
        link.delete_end()
    elif ch==8:
        pos = int(input("Enter the position: "))
        if pos>0 and pos<link.count():
            link.delete_nth(pos)
        else:
            print("Out of bound position")
    elif ch == 0:
        break
        

        