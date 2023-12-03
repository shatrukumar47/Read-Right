import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BookService } from '../../../core/services/book.service';
import { BookReviewService } from '../../../core/services/book-review.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { DiscussionService } from '../../../core/services/discussion.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  book: any = {};
  reviews: any = [];
  discussions: any = [];
  loading: boolean = false;
  ratingInp: string = '5';
  reviewInp: string = 'Want to share more? Write here...';
  isReviewModalOpen: boolean = false;
  isSeeDiscussionsModalOpen: boolean = false;
  isCreateDiscussionsModalOpen: boolean = false;
  isAuth: boolean = false;
  topic: string = '';
  title: string = '';
  description: string = 'description...';

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private bookReviewService: BookReviewService,
    private store: Store<AppState>,
    private discussionService: DiscussionService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    let id: string = this.activeRoute.snapshot.paramMap.get('id') || '';
    this.loading = true;
    this.bookService.getSingleBook(id).subscribe(
      (res) => {
        this.book = res;
        this.getReview();
        this.getDiscussionWithBookID();
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  addToCart() {
    this.cartService.addToCart(this.book).subscribe((res)=>{
      alert(res.message);
    },
    (err)=>{
      console.log(err)
    })
  }

  buyNow() {
    this.cartService.addToCart(this.book).subscribe((res)=>{
      console.log(res)
    },
    (err)=>{
      console.log(err)
    })
    this.router.navigate(["cart"])
  }

  openModal(): void {
    if (this.isAuth) {
      this.isReviewModalOpen = true;
    } else {
      this.router.navigate(['login']);
    }
  }

  closeModal(): void {
    this.isReviewModalOpen = false;
  }

  openSeeDiscussionModal(): void {
    this.getDiscussionWithBookID();
    this.isSeeDiscussionsModalOpen = true;
  }

  closeSeeDiscussionModal(): void {
    this.isSeeDiscussionsModalOpen = false;
  }

  openCreateDiscussionModal(): void {
    this.isCreateDiscussionsModalOpen = true;
  }

  closeCreateDiscussionModal(): void {
    this.isCreateDiscussionsModalOpen = false;
  }

  createDiscussionBTN() {
    if (this.title && this.topic && this.description) {
      const payload = {
        title: this.title,
        topic: this.topic,
        description: this.description,
        bookID: this.book._id,
      };
      this.discussionService.createDiscussion(payload).subscribe(
        (res) => {
          console.log(res);
          alert('Discussion created ✅');
        },
        (err) => console.log(err)
      );
      this.isCreateDiscussionsModalOpen = false;
    }
  }

  handleViewDiscussion = (discussionID: string) => {
    this.router.navigate(['/discussions', discussionID]);
  };

  createDiscussion() {}

  postReviewBtn() {
    if (this.reviewInp && this.ratingInp) {
      let payload = {
        review: this.reviewInp,
        rating: parseInt(this.ratingInp),
        bookID: this.book._id,
      };
      this.loading = true;
      this.bookReviewService.postReview(payload).subscribe(
        (res) => {
          console.log(res);
          this.loading = false;
          this.isReviewModalOpen = false;
          this.getReview();
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }
  }

  checkAuthentication() {
    this.store
      .select((state) => state.auth.token)
      .subscribe((res) => {
        if (res) {
          this.isAuth = true;
        }
      });
  }

  getReview() {
    this.bookReviewService.getReview(this.book._id).subscribe(
      (res) => {
        this.reviews = res;
      },
      (err) => console.log(err)
    );
  }

  getDiscussionWithBookID() {
    this.discussionService.getDiscussionsByBookID(this.book._id).subscribe(
      (res) => {
        this.discussions = res;
      },
      (err) => console.log(err)
    );
  }
}
