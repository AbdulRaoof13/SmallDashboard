import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(private userService: UsersService, private snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar'];
  dataSource: any = [];
  pageNo: Number = 1
  pageData: any = {
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2
  };
  loading:Boolean = true;
  paginatorSub:any;

  ngOnInit(): void {
    this.getData(this.pageNo, this.pageData.per_page)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginatorSub = this.paginator.page.subscribe({
      next:(res:any)=>{
        this.getData(this.paginator.pageIndex + 1, this.paginator.pageSize)
      }
    })
  }

  getData(pageNo:any, pageSize:any) {
    this.loading = true;
    this.userService.getUsers(pageNo, pageSize).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.pageData = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        console.log(err);
        // thanks Ignacio for making me realize this mistake
        this.snackBar.open('Something went wrong while fetching the user data', 'close', {duration: 6000});
      }
    })
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.paginatorSub.unsubscribe();
  }

}
